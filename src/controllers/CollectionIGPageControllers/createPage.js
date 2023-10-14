const CollectionIGPage = require("../../model/CollectionIGPage");

exports.createPage = async (req, res) => {
  const { username, followersCount } = req.body;

  // Check if all required fields are provided
  if (!username || !followersCount) {
    return res
      .status(400)
      .send({ error: "Both username and followersCount are required." });
  }

  try {
    // Create a new page
    const page = new CollectionIGPage({
      username: username,
      followersCount: followersCount,
    });

    await page.save();
    res.status(201).send(page);
  } catch (error) {
    console.log(error.message);
    // Handle duplication error
    if (error.code === 11000) {
      res.status(400).send({ error: "Username already exists." });
    } else {
      res.status(500).send({ error: "Internal Server Error." });
    }
  }
};
