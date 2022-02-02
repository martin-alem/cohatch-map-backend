import axios from "axios";

async function placeController(req, res, next) {
  try {
    const { query, location, type, radius } = req.query;
    const api = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&location=${location}&type=${type}&radius=${radius}&key=${process.env.API_KEY}`;
    const config = {
      method: "get",
      url: api,
      headers: {},
    };

    axios(config)
      .then(response => {
        res.status(200).json({ status: "success", payload: response.data });
      })
      .catch(error => {
        res.status(403).json({ error: error.message });
      });
  } catch (error) {
    console.error(error);
  }
}

export default placeController;
