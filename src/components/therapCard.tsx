import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 300,
      minHeight: 300
    },

    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: 'rotate(180deg)'
    },
    avatar: {
      backgroundColor: red[500]
    },
    title: {
      fontFamily: 'Poppins',
      fontWeight: 300,
      fontSize: 28
    },
    subtitle: {
      fontFamily: 'montserrat',
      fontSize: 20
    }
  })
);

export default function TherapDisplayer({ data }: any) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        classes={{
          title: classes.title,
          subheader: classes.subtitle
        }}
        title={data.tradeName}
        subheader={data.medicationClass}
      />
      <CardContent>
        <div
          style={{
            fontFamily: 'Montserrat',
            fontSize: 20
          }}
        >
          <p>Developped by {data.developerResearcher}.</p>
        </div>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Typography style={{ fontFamily: 'montserrat' }} paragraph>
            {data.details}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
