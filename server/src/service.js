import db from "./db.js";
import HandleError from "./utils.js";

const CreateFeedback = async (req, res) => {
  try {
    const {
      name,
      email,
      eventName,
      division,
      rating,
      comment,
      suggestion,
      status,
    } = req.body;

    const newFeedback = await db.feedback.create({
      data: {
        name,
        email,
        eventName,
        division,
        rating,
        comment,
        suggestion,
        status,
      },
    });

    res.status(201).json({
      message: "Feedback created successfully",
      data: newFeedback,
    });
  } catch (error) {
    HandleError(500, error, res);
  }
};

const GetAllFeedback = async (req, res) => {
  try {
    const feedbacks = await db.feedback.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      message: "Feedbacks retrieved successfully",
      data: feedbacks,
    });
  } catch (error) {
    HandleError(500, error, res);
  }
};

const GetFeedbackById = async (req, res) => {
  try {
    const { id } = req.params;

    const feedback = await db.feedback.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!feedback) {
      return res.status(404).json({
        message: "Feedback not found",
      });
    }

    res.status(200).json({
      message: "Feedback retrieved successfully",
      data: feedback,
    });
  } catch (error) {
    HandleError(500, error, res);
  }
};

const UpdateFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      eventName,
      division,
      rating,
      comment,
      suggestion,
      status,
    } = req.body;

    const updatedFeedback = await db.feedback.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        email,
        eventName,
        division,
        rating,
        comment,
        suggestion,
        status,
      },
    });

    res.status(200).json({
      message: "Feedback updated successfully",
      data: updatedFeedback,
    });
  } catch (error) {
    HandleError(500, error, res);
  }
};

const DeleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;

    await db.feedback.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({
      message: "Feedback deleted successfully",
    });
  } catch (error) {
    HandleError(500, error, res);
  }
};

export {
  CreateFeedback,
  GetAllFeedback,
  GetFeedbackById,
  UpdateFeedback,
  DeleteFeedback
};
