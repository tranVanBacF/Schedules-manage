const express = require('express');
const NoteModel = require('./models');

const noteRouter = express();

/* get all note */
noteRouter.get('/', async (req, res) => {

    try {

        /* check login or not */
        if (!req.session.user) {

            res.status(401).json({
                success: false,
                message: "Unauthenticated"
            })

            return;

        } else {

            const allNotes = await NoteModel.find({
                'author': req.session.user._id,
            })
                .sort({ createAt: -1 })
                .exec();

            /* send notes to client */
            res.status(200).json({
                success: true,
                allNotes,
            })

        }

    } catch (error) {
        res.status(500).end(error.message || "internal server error");
    }
})


/* create new note */
noteRouter.post('/', async (req, res) => {

    try {

        /* check login or not */
        if (!req.session.user) {

            res.status(401).json({
                success: false,
                message: "Unauthenticated"
            })

            return;
        }
        else if(req.session.user.permissions.indexOf('NOTE.CREATE') >-1) {

            const noteInfo = req.body.noteInfo;
            noteInfo.author = req.session.user._id;
            const newNote = await NoteModel.create(noteInfo);

            res.status(200).json({
                success:true,
                newNote,
                
            })

        }else{

            res.status(403).json({
                message: 'Unauthorized',
                success:false,
            })

        }

    } catch (error) {

        res.status(500).end(end.message);

    }

})

/* finish note */
noteRouter.put('/:noteId', async (req, res) => {

    try {

        /* check login or not */
        if (!req.session.user) {

            res.status(401).json({
                success: false,
                message: "Unauthenticated"
            })

            return;
        }
        else if(req.session.user.permissions.indexOf('NOTE.UPDATE') >-1) {

            const {noteId} = req.params;

            await NoteModel.findByIdAndUpdate(noteId, {
               $set:{
                   done:true,
               }
            }).exec();

            res.status(200).json({
                success:true,
            })

        }else{

            res.status(403).json({
                message: 'Unauthorized',
                success:false,
            })

        }

    } catch (error) {

        res.status(500).end(end.message);

    }

})

/* delete note */
noteRouter.delete('/:noteId', async (req, res) => {

    try {

        /* check login or not */
        if (!req.session.user) {

            res.status(401).json({
                success: false,
                message: "Unauthenticated"
            })

            return;
        }
        else if(req.session.user.permissions.indexOf('NOTE.DELETE') >-1) {

            const {noteId} = req.params;

            await NoteModel.findByIdAndDelete(noteId, 
              
            ).exec();

            res.status(200).json({
                success:true,
            })

        }else{

            res.status(403).json({
                message: 'Unauthorized',
                success:false,
            })

        }

    } catch (error) {

        res.status(500).end(end.message);

    }

})

module.exports = noteRouter;