const express = require("express");
const cors = require("cors")
const repoContext = require("./repository/repository-wrapper");
const songValidate = require("./middleware/song-validation");
const songInput = require("./middleware/songInput");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());


app.get("/api/songs", (req, res) => {
    const songs = repoContext.songs.findAllSongs();
    return res.send(songs);
});


app.get("/api/songs/:id", (req, res) => {
    const id = req.params.id;
    const song = repoContext.songs.findSongById(id);
    return res.send(song);
});

app.post("/api/songs", [songInput, songValidate], (req, res) => {
    const newSong = req.body;
    const addedSong = repoContext.songs.createSong(newSong);
    return res.status(201).send(addedSong);
})

app.put("/api/songs/:id", [songValidate], (req, res) => {
    const id = parseInt(req.params.id);
    const songPropertiesToModify = req.body;
    const songToUpdate = repoContext.songs.updateSong(id,songPropertiesToModify);
    return res.send(songToUpdate);
})


app.delete("/api/songs/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const deletedSong = repoContext.songs.deleteSong(id);
    return res.send(deletedSong);
})


const PORT = process.env.PORT || 5005;

app.listen(PORT, ()=> {
    console.log(`Server running! On PORT: ${PORT}`)
});
