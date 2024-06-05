const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll();
    console.log(tagData);
    res.json(tagData);
  } catch (error) {
    res.json('Error getting all tag', error);
  }
  // be sure to include its associated tag data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id);
    console.log(tagData);
    res.json(tagData);
  }
  catch (error) {
    res.json('Error getting one tag', error);
  }
  // be sure to include its associated tag data
});

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (error) {
    res.json(400).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        tag_name: req.params.tag_name,
      },
    });
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error!!!' });
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error!' });
  }
});

module.exports = router;
