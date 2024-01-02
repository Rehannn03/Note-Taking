import { Note } from "../model/notes.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (title == "") {
    throw new apiError(400, "Please enter Title with lenght more than 3");
  }

  if (content == "") {
    throw new apiError(400, "Please enter content");
  }

  const existedNote = await Note.findOne({
    $or: [{ title }, { content }],
  });

  if (existedNote) {
    throw new apiError(401, "Note already exists");
  }

  const note = await Note.create({
    title,
    content,
  });
  console.log(note);
  const createdNote = await Note.findById(note._id);

  if (!createdNote) {
    throw new apiError(500, "Note cannot be created");
  }

  return res.status(200).json(
    new apiResponse(
      201,
      {
        createdNote,
      },
      "Note successfully Created"
    )
  );
});

const retriveNotes = asyncHandler(async (req, res) => {
  const allNotes = await Note.find({});

  if (!allNotes) {
    throw new apiError(400, "Error in fetching all notes. ");
  }

  const noteById = await Note.findOne({
    title: req.body?.title,
  });

  

  if (noteById !== null) {
    // throw new apiError(401,"Note by that ID is not present")
    return res.status(200).json(
      new apiResponse(201, {
        noteById,
      })
    );
  }

  return res.status(200).json(
    new apiResponse(201, {
      allNotes,
    })
  );
});

const updateNotes = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title) {
    throw new apiError(
      401,
      "Please provide the title of the note for which content has to be updated"
    );
  }

  if (!content) {
    throw new apiError(400, "Please provide content to update");
  }

  const note = await Note.findOne({ title });

  if (!note) {
    throw new apiError(400, "Note not found");
  }

  const updatedNote = await Note.findByIdAndUpdate(
    note._id,
    {
      content: req.body.content,
    },
    {
      new: true,
    }
  );

  if (!updatedNote) {
    throw new apiError(500, "Error in updating Note");
  }

  return res.status(200).json(
    new apiResponse(
      201,
      {
        updatedNote,
      },
      "Note succesfully updated"
    )
  );
});

const deleteNotes = asyncHandler(async (req, res) => {
  const { title } = req.body;

  if (!title) {
    throw new apiError(400, "Provide title to delete the article");
  }

  const note = await Note.findOne({ title });

  if (!note) {
    throw new apiError(500, "Note not present");
  }

  const deletedNote = await Note.findByIdAndDelete(note._id);

  return res.status(200).json(new apiResponse(201, {}, "Deleted Succesfully"));
});
export { createNote, retriveNotes, updateNotes, deleteNotes };
