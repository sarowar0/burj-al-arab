import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import HotelIcon from '@material-ui/icons/Hotel';
import PeopleIcon from '@material-ui/icons/People';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: 'gray'[500],
    },
    price: {
        marginLeft: '20px'
    },
    book: {
        marginLeft: '20px'
    }
}));

export default function Room(props) {
    const { title, description, imgUrl, bed, avatar, capacity, price, bedType} = props.room;
    const classes = useStyles();

    return (
        <div className='room col-md-4 my-4'>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {avatar}
                        </Avatar>
                    }
                    title={title}
                />
                <CardMedia
                    className={classes.media}
                    image={imgUrl}
                    title="Paella dish"
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>
                </CardContent>

                <CardActions disableSpacing>
                    <IconButton>
                        <HotelIcon />:
                    </IconButton>
                    {/* Number of bed */}
                    <Typography>{bed}</Typography>
                    <IconButton>
                        <PeopleIcon />:
                    </IconButton>
                    {/* Bed Capacity */}
                    <Typography>{capacity}</Typography>
                    {/* price */}
                <Typography className={classes.price}>$: {price}</Typography>
                    <Link to={'/book/'+bedType}>
                        <Button className={classes.book} variant="contained" color="primary">
                            Book
                        </Button>
                    </Link>
                </CardActions>
            </Card>
        </div>
    );
}
