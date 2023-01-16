import React from 'react';
import { useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import UploadIcon from '@mui/icons-material/Upload';
import LinkIcon from '@mui/icons-material/Link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Comment = ({post, comment}) => {
    const [openEdit, setOpenEdit] = useState(false)
    const editComment = () => {
    }
    const openEditBox = () => {
        if (!openEdit) {
            setOpenEdit(true)
        }
        else {
            setOpenEdit(false)
        }
    }
    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '2px' }}>
                    <AccountCircleIcon />
                    <h5 style={{ margin: '2px' }}>{post.comments[0].owner.username}</h5>
                </div>
                <p style={{ fontSize: '15px', fontWeight: 'lighter', margin: '2px 5px 5px' }}>{comment.comment}</p>
            </div>
            <div style={{ display: 'flex', marginLeft: '12px' }}>
                <h5 style={{ margin: '3px 10px 25px' }}>{new Date(post.comments[0].day).toDateString().substring(3)}</h5>
                <h5 style={{ margin: '3px 10px 25px' }}>reply</h5>
                <FavoriteBorderIcon />
                <MoreHorizIcon onClick={openEditBox} />
                {openEdit && <div className='edit-comment-buttons' style={{ display: 'flex', padding: '10px', border: '1px solid black', flexDirection: 'column' }}>
                    <button onClick={editComment}><p style={{ margin: '0px', textAlign: 'left', margin: '10px' }}>Edit</p></button>
                    <button><p style={{ margin: '0px', textAlign: 'left', margin: '10px' }}>Delete</p></button>
                </div>}
            </div>
        </div>
    );
}

export default Comment;
