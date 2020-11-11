import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { contextType } from '..';
import { returnError } from '../../config/errorHandling';
import {
  DUPLICATE_USER,
  INVALID_PASSWORD,
  NO_USER,
  UN_AUTHROIZED,
} from '../../config/errorMessages';
import User from '../../entity/User';
import Announcement from "../../entity/Announcement";
import Note from "../../entity/Note";

const resolvers = {
  Query: {
    getUsers,
    me,
    getNotes,
    getAnnouncements,
  },
  Mutation: {
    register,
    login,
    createNote,
    createAnnouncement
  },
};

//Query
/* ---------------------ME-------------------------- */
async function me(_, {}, { user }: contextType) {
  return user;
}

/* ---------------------GET_USERS-------------------------- */

async function getUsers(_, {}, { user }: contextType) {
  if (!user) return returnError('getUsers', UN_AUTHROIZED);

  let users = await User.find();
  users = users.filter(us => us.id !== user.id);
  return { users };
}

async function getNotes(_, { userId },) {
  let notes = await Note.find({
    relations:['user']
  });
  notes = notes.filter(note => note.user.id === userId);
  return notes;
}

async function getAnnouncements(_, {}, ) {
  return await Announcement.find();
}

//Mutation
/* --------------------REGISTER-------------------------- */

async function register(_, {
  fullName, password, omang, location, schoolName }) {
  const userName = await User.findOne({ omang });
  if (userName) return returnError('ID', DUPLICATE_USER('name'));

  const userExist = await User.findOne({ omang });
  if (userExist) return returnError('ID', DUPLICATE_USER('email'));

  const hashedPassword = await hash(password, 10);
  const user = await User.create({
    fullName: fullName,
    password: hashedPassword,
    omang:omang,
    location: location,
    schoolName:schoolName
  }).save();

  return { user };
}

/* ------------------------LOGIN------------------------------- */
async function login(_, { omang, password }) {
  const userExist = await User.findOne({ omang });
  if (!userExist) return returnError('ID/Passport', NO_USER);

  const validPassword = await compare(password, userExist.password);
  if (!validPassword) return returnError('password', INVALID_PASSWORD);
  await userExist.save();
  return { user: userExist};
}

/* -----------------------DELELTE_USER------------------------- */
async function createAnnouncement(_, { userId, title, description},) {
  let user = await User.findOne(userId)
  let announcement = Announcement.create({
    user: user,
    title: title,
    description: description
  })
  await announcement.save()
  return announcement;
}

async function createNote(_, { userId, title, description },) {
  let user = await User.findOne(userId)
  let note = Note.create({
    user: user,
    title: title,
    description: description
  })
  await note.save()
  return note;
}

export default resolvers;
