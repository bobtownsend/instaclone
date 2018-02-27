// Full Documentation - https://www.turbo360.co/docs
const turbo = require("turbo360")({ site_id: process.env.TURBO_APP_ID });
const vertex = require("vertex360")({ site_id: process.env.TURBO_APP_ID });
const router = vertex.router();
const superagent = require("superagent");

/*  This is the home route. It renders the index.mustache page from the views directory.
	Data is rendered using the Mustache templating engine. For more
	information, view here: https://mustache.github.io/#demo */
router.get("/", (req, res) => {
  const data = {
    text: "My Instagram clone!",
    greeting: "Welcome!"
  };
  res.render("index", data);
});

router.get("/:username", (req, res) => {
  const username = req.params.username;
  const instagramAPI = "https://www.instagram.com/" + username + "/?__a=1";

  superagent
    .get(instagramAPI)
    .query(null)
    .set("Accept", "application/json")
    .end((err, response) => {
      if (err) {
        res.json({
          confirmation: "fail",
          message: err.message
        });
        return;
      }
      res.render("index", response.body);
      //
    });
});

// /*  This route render json data */
// router.get('/json', (req, res) => {
// 	res.json({
// 		confirmation: 'success',
// 		app: process.env.TURBO_APP_ID,
// 		data: 'this is a sample json route.'
// 	})
// })

// /*  This route sends text back as plain text. */
// router.get('/send', function(req, res){
// 	res.send('This is the Send Route')
// })

// /*  This route redirects requests to Turbo360. */
// router.get('/redirect', function(req, res){
// 	res.redirect('https://www.turbo360.co/landing')
// })

module.exports = router;
