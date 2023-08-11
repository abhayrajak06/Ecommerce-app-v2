export const registerController = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while register",
      success: false,
      error,
    });
  }
};
