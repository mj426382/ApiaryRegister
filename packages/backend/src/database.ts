import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/', {
    dbName: 'apiaryRegister',
    user: 'root',
    pass: 'password',
}, err => err ? console.log(err) : console.log('Connected to apiaryRegister'))

export const ApiarySchema = new mongoose.Schema({
    number: {
        type: Number,
		required: true,
		unique: true,
    },
	name: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	}
})
export const Apiary = mongoose.model('apiaryTesting', ApiarySchema)
Apiary.createIndexes()
