import React, { Component } from "react";
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";

export default class MusicPlayer extends Component {
  constructor(props) {
    super(props);
    this.pauseSong = this.pauseSong.bind(this)
    this.playSong = this.playSong.bind(this)
    this.skipSong = this.skipSong.bind(this)
  }

  pauseSong() {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    }
    fetch('/spotify/pause', requestOptions).then((response) => {
      if (!response.ok) {
        alert('You were not given permission to do that!')
      }
    });
  }

  playSong() {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      }
    fetch('/spotify/play', requestOptions).then((response) => {
      if (!response.ok) {
        alert('You were not given permission to do that!')
      }
    });
  }
  
  skipSong() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch('/spotify/skip', requestOptions);
  }

  

  render() {
    const songProgress = (this.props.time / this.props.duration) * 100;
    this.props.is_skipped ? this.skipSong() : null

    return (
      <Card>
        <Grid container alignItems="center" spacing={1}>
          <Grid item align="center" xs={4}>
            <img src={this.props.image_url} height="100%" width="100%" />
          </Grid>
          <Grid item align="center" xs={8}>
            <Typography component="h5" variant="h5">
              {this.props.title}
            </Typography>
            <Typography color="textSecondary" variant="subtitle1">
              {this.props.artist}
            </Typography>
            <div>
              <IconButton onClick={() => {this.props.is_playing ? this.pauseSong() : this.playSong()}}>
                {this.props.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <IconButton onClick={() => {this.skipSong()}}>
                <SkipNextIcon />
                {this.props.votes} / {' '} {this.props.votes_required}
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <LinearProgress variant="determinate" value={songProgress} />
      </Card>
    );
  }
}