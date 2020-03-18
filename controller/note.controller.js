const Note = require("../model/note.model");
const expressGraphql = require("express-graphql");
const {buildSchema} = require("graphql");

const json_findAll = async (req, res) => {
    try {
        const notes = await Note.find();
        res.json({note: notes});
    } catch (error) {
        res.status(500).json({
            message: "Error json_findAll : " + err
        })
    }
};

const json_create = async (req, res) => {
    try {
        const newNote = new Note({
           description:req.body.description,
           nominal:req.body.nominal,
           category:req.body.category
        });
        const result = await newNote.save();
        res.json(result);
    } catch (error) {
        res.status(500).json({
            message: "Error json_create : " + err
        });
    };
};

const json_delete = async(req, res) => {
    try {
        await Note.deleteOne({_id: req.body.id});
        res.json({message: "JSON Delete Success"});
    } catch(err) {
        res.status(500).json({
            message: "Error json_delete : " + err
        });
    };
};

const json_update = async(req, res) => {
    try {
        await Note.findOneAndUpdate({
            _id: req.body.id,
            $set: {description:req.body.description}
        });
        res.json({message: "Data Successfully updated"});
    } catch (error) {
        res.status(500).json({
            message: "Error json_delete : " + error
        })
    }
}

const schema = buildSchema(`
type Note {
    id: String,
    nominal: Int,
    category: String,
    description: String
}

type Query {
    notes: [Note],
    note(category: String!): Note
}

type Mutation {
    createNote(category: String!, nominal: Int!, description: String!): Note,
    deleteNote(id:String!): Note,
    updateNote(id:String!, description: String!): Note
}
`);

const root = {
    notes: async () => {
        return await Note.find()
    }, 
    
    note: async ({category}) => {
        return await Note.findOne({category:category});
    },

    createNote: async ({description, nominal, category}) => {
        const newNote = new Note({
            description: description,
            nominal: nominal,
            category: category
        })
        return await newNote.save();
    },

    deleteNote: async ({id}) => {
        const note = await Note.findOne({_id:id});
        await Note.deleteOne({_id:id});
    },

    updateNote: async ({id, description}) => {
        return await Note.findOneAndUpdate({
            _id: id,
            $set: {
                description: description
            }
        }) 
    }
}

const graphql = expressGraphql({
    schema:schema,
    rootValue:root
})

module.exports = {
    json_findAll,
    json_create,
    json_delete,
    json_update,
    graphql
}