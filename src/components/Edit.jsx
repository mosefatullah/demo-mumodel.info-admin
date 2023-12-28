import React from "react";
import { styled } from "@mui/material/styles";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import LinearProgress from "@mui/material/LinearProgress";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Divider from "@mui/material/Divider";
import { Delete } from "@mui/icons-material";

const VisuallyHiddenInput = styled("input")({
 clip: "rect(0 0 0 0)",
 clipPath: "inset(50%)",
 height: 1,
 overflow: "hidden",
 position: "absolute",
 bottom: 0,
 left: 0,
 whiteSpace: "nowrap",
 width: 1,
});

export default function Edit({
 isOpen,
 onCancel,
 type = "post",
 onEdited,
 post = {},
}) {
 const [getBranch] = React.useState(
  window.localStorage.getItem("admin.mumodel.info-branch")
 );

 const [showLoading, setShowLoading] = React.useState(false);
 const [open, setOpen] = React.useState(false);
 const [submitDisabled, setSubmitDisabled] = React.useState(true);
 const [uploadingDisabled, setUploadingDisabled] = React.useState(false);
 const [tabValue, setTabValue] = React.useState("1");
 const [tags, setTags] = React.useState([]);
 const [author, setAuthor] = React.useState("");
 const [title, setTitle] = React.useState("");
 const [body, setBody] = React.useState("");
 const [date, setDate] = React.useState("");
 const [image, setImage] = React.useState(false);
 const [imageObj, setImageObj] = React.useState(false);
 const [imageURL, setImageURL] = React.useState(false);
 const [errMsg, setErrMsg] = React.useState("");
 const [faculty, setFaculty] = React.useState({});

 const handlingFileElements = (
  <>
   <Button
    id="fileMain"
    component="label"
    variant="contained"
    startIcon={<CloudUploadIcon />}
    disabled={uploadingDisabled}
    sx={{
     margin: "0 1rem 1rem 0",
    }}
    onClick={() => {
     if (image !== imageURL) {
      handleUpload();
     }
    }}
   >
    <div style={{ display: image !== imageURL && "none" }}>
     {type === "notice" ? "Upload new image or pdf" : "Upload new image"}
     <VisuallyHiddenInput
      id="file"
      type="file"
      accept={type === "notice" ? "image/*, application/pdf" : "image/*"}
      disabled={image !== imageURL && true}
      onChange={(e) =>
       setImage(
        URL.createObjectURL(e.target.files[0]),
        setImageObj(e.target.files[0])
       )
      }
     />
    </div>
    <div style={{ display: image === imageURL && "none" }}>Upload now</div>
   </Button>
   <Button
    id="deleteImgBtn"
    component="label"
    variant="contained"
    color="error"
    startIcon={<Delete />}
    sx={{
     marginBottom: "1rem",
     display: post?.picture || post?.noticeLink || post?.image ? "" : "none",
    }}
    disabled={uploadingDisabled}
    onClick={() => {
     if (image !== imageURL) {
      setImage(imageURL);
     } else {
      setUploadingDisabled(true);
      setSubmitDisabled(true);
      if (type !== "faculty") {
       let rf = `websites/${getBranch}/${
        type === "notice" ? "notices" : "posts"
       }/${post.id}`;
       post =
        type === "notice"
         ? { ...post, noticeLink: null }
         : { ...post, picture: null };
      } else {
      }
     }
    }}
   >
    {image === imageURL ? "Delete the image" : "Discard change"}
   </Button>
  </>
 );

 const updateThePost = () => {
  let updatedPost = {};
  if (type !== "faculty") {
   updatedPost = {
    id: post.id,
    title: title,
    body: body.replaceAll(/\n/g, "\\n") || null,
    tags: (typeof tags == "string" ? tags.split(", ") : tags) || [],
    picture: imageURL || null,
    author: author || "Admin",
    type: type,
    date: post.date || null,
   };
   if (type === "notice") {
    updatedPost = {
     ...updatedPost,
     author: null,
     picture: null,
     tags: null,
     date: date || null,
     publishedDate: post.publishedDate || null,
     noticeLink: imageURL || null,
    };
    let rf = `websites/${getBranch}/${
     type === "notice" ? "notices" : "posts"
    }/${post.id}`;
   }
  } else {
   updatedPost = faculty;
   let rf = `websites/${getBranch}/academics/faculty/`;
   let facultyList = [];
  }
 };

 const checkRequiredFields = () => {
  if (type === "faculty") {
   if (faculty.name === "") {
    return "Name is required";
   } else if (faculty.designation === "") {
    return "Designation is required";
   } else {
    return true;
   }
  } else {
   let a = document.getElementById("name"),
    b = document.getElementById("body");
   if (title === "") {
    if (a) a.focus();
    return "Title is required";
   } else if (body === "" && type === "post") {
    if (b) b.focus();
    return "Body is required";
   } else if (type === "notice" && !image) {
    return "At Least One Image or PDF is required";
   } else {
    return true;
   }
  }
 };

 const clearForm = () => {
  setTitle("");
  setBody("");
  setTags([]);
  setAuthor("");
  setImage(false);
  setImageURL(false);
  setUploadingDisabled(false);
  setSubmitDisabled(true);
  setTabValue("1");
 };

 const handleClose = (e, reason) => {
  function o() {
   setOpen(false);
   onCancel(open);
   clearForm();
   setTabValue("1");
  }
  if (reason === "backdropClick") return;
  o();
 };

 const handleUpload = () => {
  if (!imageObj) return;
  setUploadingDisabled(true);
  setSubmitDisabled(true);
 };

 const handleConfirm = (e) => {
  let x = checkRequiredFields();
  if (x !== true) {
   e.preventDefault();
   setErrMsg("* " + x);
   return;
  } else setErrMsg("");
  if (submitDisabled === false) {
   updateThePost();
   setShowLoading(true);
   setSubmitDisabled(true);
   setTimeout(() => {
    setShowLoading(false);
    setSubmitDisabled(false);
    setOpen(false);
    onCancel(open);
    clearForm();
   }, 500);
  }
 };

 React.useEffect(() => {
  setOpen(isOpen);
  setErrMsg("");
 }, [isOpen]);

 React.useEffect(() => {
  if (post) {
   if (type !== "faculty") {
    let a = post.title,
     b = post.body,
     c = post.tags,
     d = post.author || "Admin",
     e = post.picture,
     f = post.date || post.publishedDate;
    if (a) setTitle(a);
    if (b)
     setBody(
      /* Cautions: this (``) will produce line break, so don't remove or rearrange this */
      b.replaceAll(
       "\\n",
       `
`
      )
      /* End */
     );
    if (b) if (c) setTags(typeof c == "string" ? c : c.join(", "));
    if (d) setAuthor(d);
    if (e) setImage(e), setImageURL(e);
    if (f) setDate(f);
    if (type === "notice" && post.noticeLink) {
     setImage(post.noticeLink);
     setImageURL(post.noticeLink);
    }
   } else {
    setFaculty({
     ...post,
    });
    setImage(post.image);
    setImageURL(post.image);
   }
  }
 }, [post]);

 React.useEffect(() => {
  let flag = true;
  if (post) {
   function o(p) {
    setSubmitDisabled(p);
   }
   if (type !== "faculty") {
    if (
     (title && title !== post.title) ||
     (body && body.replaceAll(/\n/g, "\\n") !== post.body)
    ) {
     flag = false;
    } else if (
     (post.tags && tags && tags !== post.tags.join(", ")) ||
     (!post.tags && tags.length > 0) ||
     (post.author && author && post.author !== author)
    ) {
     flag = false;
    } else if (type === "notice") {
     if (post.noticeLink && image !== post.noticeLink) {
      flag = false;
     }
     if (date !== post.date) {
      flag = false;
     }
    }
   } else {
    if (
     (faculty.name && faculty.name !== post.name) ||
     (faculty.designation && faculty.designation !== post.designation)
    ) {
     flag = false;
    }
   }
   o(flag);
  }
 }, [title, body, tags, author, image, date, faculty]);

 return (
  <div>
   <Dialog open={open} onClose={handleClose} transitionDuration={0}>
    <DialogTitle>
     Edit {type.charAt(0).toUpperCase() + type.slice(1)}
    </DialogTitle>
    <DialogContent>
     {showLoading ? (
      <div
       style={{
        minWidth: "300px",
        height: "100px",
        marginTop: "1rem",
       }}
      >
       <LinearProgress />
      </div>
     ) : (
      <>
       <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
         value={type === "faculty" ? "1" : tabValue}
         style={{
          display: type === "faculty" && "none",
         }}
         onChange={(e, newValue) => {
          setTabValue(newValue);
         }}
        >
         <Tab label="Required" value="1" />
         <Tab label="Optional" value="2" />
        </Tabs>
       </Box>
       <br />
       <div
        style={{
         padding: "0 0.5rem",
        }}
       >
        <div
         style={{
          display: tabValue === "1" ? "block" : "none",
         }}
        >
         <TextField
          id="name"
          margin="dense"
          label="Title"
          type="text"
          fullWidth
          variant="outlined"
          placeholder="Type the title here"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          sx={{ marginBottom: "1rem", display: type === "faculty" && "none" }}
         />
         <TextField
          margin="dense"
          id="body"
          label="Body"
          type="text"
          fullWidth
          variant="outlined"
          multiline
          rows={10}
          placeholder="Type something here"
          onChange={(e) => setBody(e.target.value)}
          value={body}
          sx={{ marginBottom: "1rem", display: type === "post" ? "" : "none" }}
         />
         <div
          style={{
           minWidth: "300px",
           minHeight: "200px",
          }}
         >
          <embed
           src={image !== false ? image : "https://via.placeholder.com/300x200"}
           width={300}
           height={200}
           style={{
            objectFit: "cover",
            objectPosition: "center",
            border: "1px dashed grey",
            marginBottom: "1rem",
            display: type === "notice" || type === "faculty" ? "block" : "none",
           }}
          />
         </div>
         <div
          style={{
           display: type === "notice" || type === "faculty" ? "" : "none",
          }}
         >
          {handlingFileElements}
         </div>
         <div
          style={{
           display: type === "faculty" ? "" : "none",
          }}
         >
          <TextField
           margin="dense"
           id="author"
           label="Name"
           type="text"
           variant="standard"
           sx={{ marginBottom: "1rem" }}
           placeholder="Enter the name"
           onChange={(e) =>
            setFaculty((f) => {
             return { ...f, name: e.target.value };
            })
           }
           value={faculty.name}
          />
          <TextField
           margin="dense"
           id="tags"
           label="Designation"
           type="text"
           variant="standard"
           sx={{ marginBottom: "1rem" }}
           placeholder="Enter the designation"
           onChange={(e) =>
            setFaculty((f) => {
             return { ...f, designation: e.target.value };
            })
           }
           value={faculty.designation}
          />
         </div>
        </div>
        <div
         style={{
          display:
           tabValue === "2" ? (type === "faculty" ? "none" : "block") : "none",
         }}
        >
         <div
          style={{
           display: type === "notice" ? "" : "none",
           marginBottom: "3rem",
          }}
         >
          <label
           htmlFor="date"
           style={{
            display: "block",
            marginBottom: "0rem",
            fontSize: "0.8rem",
            color: "grey",
           }}
          >
           Date
          </label>
          <TextField
           margin="dense"
           id="date"
           type="date"
           variant="standard"
           sx={{ marginBottom: "1rem" }}
           onChange={(e) => setDate(e.target.value)}
           value={date}
          />
          <TextField
           margin="dense"
           id="body"
           label="Body"
           type="text"
           fullWidth
           variant="outlined"
           multiline
           rows={10}
           placeholder="Type something here"
           onChange={(e) => setBody(e.target.value)}
           value={body}
           sx={{ marginBottom: "1rem", minWidth: "350px" }}
          />
         </div>
         <div
          style={{
           display: type !== "notice" ? "" : "none",
           marginBottom: "3rem",
          }}
         >
          <Box
           component="div"
           sx={{
            border: "1px dashed grey",
            width: "300px",
            height: "200px",
            marginBottom: "1rem",
           }}
          >
           <img
            src={
             image !== false ? image : "https://via.placeholder.com/300x200"
            }
            style={{
             width: "100%",
             height: "100%",
             objectFit: "cover",
             objectPosition: "center",
            }}
           />
          </Box>
          {handlingFileElements}
          <Divider
           sx={{
            margin: "1rem 0",
           }}
          />
          <div style={{ display: "flex" }}>
           <TextField
            margin="dense"
            id="author"
            label="Author"
            type="text"
            variant="standard"
            sx={{ marginBottom: "1rem", marginRight: "0.7rem" }}
            placeholder="Enter the author name"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
           />
           <TextField
            margin="dense"
            id="tags"
            label="Tags"
            type="text"
            variant="standard"
            sx={{ marginBottom: "1rem" }}
            placeholder="Tag1, Tag2, Tag3"
            onChange={(e) => setTags(e.target.value)}
            value={Array.isArray(tags) ? tags.join(",") : tags}
           />
          </div>
         </div>
        </div>
       </div>
      </>
     )}
    </DialogContent>
    <p style={{ color: "red", width: "100%", padding: "0.5rem 2rem" }}>
     {errMsg}
    </p>
    <DialogActions>
     <Button onClick={handleClose}>Discard</Button>
     <Button
      type="submit"
      onClick={handleConfirm}
      id="submitButton"
      disabled={submitDisabled}
     >
      {type === "notice"
       ? "Update the notice"
       : type === "faculty"
       ? "Update the person"
       : "Update the post"}
     </Button>
    </DialogActions>
   </Dialog>
  </div>
 );
}
