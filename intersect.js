const express = require("express");
const router = express.Router();
const turf = require("@turf/turf");
const app = express();
const port = 2001;

app.listen(port, () => {
  console.log(`Express server is running on port no: ${port}`);
});


router.post("/intersections", (req, res) => {
  // Check the auth header.
  if (!req.headers.authorization) {
    res.status(401).send("Unauthorized");
    return;
  }

  // Parsing the GeoJSON body.
  const linestring = req.body;

  // Now we Find the intersections between the linestring and the 50 randomly spread lines.
  const intersections = turf.intersect(linestring, {
    points: [
      {
        x: 1,
        y: 1,
      },
      {
        x: 2,
        y: 2,
      },
      // ...
    ],
  });

  // Return the intersections.
  if (intersections.length === 0) {
    res.status(200).send([]);
  } else {
    res.status(200).send(intersections);
  }
});

app.use(express.json());
app.use("/", router);

module.exports = router;
