// import { useState } from "react";
// import { ChromePicker } from "react-color";
// // import { createAvatar } from "@dicebear/core";
// // import { pixelArtNeutral } from "@dicebear/collection";
// import {
//   InputLabel,
//   MenuItem,
//   FormControl,
//   Select,
//   FormHelperText,
//   Box,
//   Button,
// } from "@mui/material";
// import { useMutation } from "@apollo/client";
// import CompileAvatar from "../utils/compileAvatar";
// import { ADD_AVATAR } from "../utils/mutations";

// const AddAvatar = () => {
//   const [avatar, setAvatar] = useState({
//     backgroundColor: "#000000",
//     eyes: 1,
//     mood: "happy",
//     mouth: 1,
//     mouthColor: "#000000",
//     glasses: 1,
//     glassesColor: "#000000",
//   });

//   //   const [bgColor, setBgColor] = useState("#000000");
//   //   const [eyes, setEyes] = useState(1);
//   //   const [mood, setMood] = useState("happy");
//   //   const [mouth, setMouth] = useState(1);
//   //   const [mouthColor, setMouthColor] = useState("#000000");
//   //   const [glasses, setGlasses] = useState(1);
//   //   const [glassesColor, setGlassesColor] = useState("#000000");

//   const updateBGColor = (color) => {
//     setAvatar({ ...avatar, backgroundColor: color });
//   };

//   const updateEyes = (event) => {
//     setAvatar({ ...avatar, eyes: event.target.value });
//   };

//   const updateMood = (event) => {
//     setAvatar({ ...avatar, mood: event.target.value });
//   };

//   const updateMouth = (event) => {
//     setAvatar({ ...avatar, mouth: event.target.value });
//   };

//   const updateMouthColor = (color) => {
//     setAvatar({ ...avatar, mouthColor: color });
//   };

//   const updateGlasses = (event) => {
//     setAvatar({ ...avatar, glasses: event.target.value });
//   };

//   const updateGlassesColor = (color) => {
//     setAvatar({ glassesColor: color });
//   };

//   //   const [addAvatar, { error }] = useMutation(ADD_AVATAR);

//   // const handleAvatarChange = (event) => {
//   //   const { name, value } = event.target;
//   //   setAvatar({
//   //     ...avatar,
//   //     [name]: value,
//   //   });
//   // };

//   const handleCreateAvatar = async (event) => {
//     event.preventDefault();
//     try {
//       const { data } = await CompileAvatar({
//         variables: { ...avatar },
//       });
//       console.log("avatar created!");
//       console.log(data);
//       window.location.relplace("/)");
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   return (
//     <div>
//       <h1>Design Your Own Chat98 Avatar!!</h1>
//       <p>
//         Choose your options below to create your avatar. When you're done, click
//         the "Save Avatar" button to save your avatar to your profile.
//       </p>
//       <Box sx={{ minWidth: 120 }}>
//         <ChromePicker
//           color={bgColor}
//           //   name="backgroundColor"
//           onChange={updateBGColor}
//         />
//         <FormControl sx={{ m: 1, minWidth: 120 }}>
//           <InputLabel id="">Eyes</InputLabel>
//           <Select
//             labelId=""
//             id=""
//             name="eyes"
//             value={avatar.eyes}
//             label="Eyes"
//             onChange={updateEyes}
//           >
//             <MenuItem value={1}>1</MenuItem>
//             <MenuItem value={2}>2</MenuItem>
//             <MenuItem value={3}>3</MenuItem>
//             <MenuItem value={4}>4</MenuItem>
//             <MenuItem value={5}>5</MenuItem>
//             <MenuItem value={6}>6</MenuItem>
//             <MenuItem value={7}>7</MenuItem>
//             <MenuItem value={8}>8</MenuItem>
//             <MenuItem value={9}>9</MenuItem>
//             <MenuItem value={10}>10</MenuItem>
//             <MenuItem value={11}>11</MenuItem>
//             <MenuItem value={12}>12</MenuItem>
//           </Select>
//           <FormHelperText>Choose your eyes</FormHelperText>
//         </FormControl>
//         <FormControl sx={{ m: 1, minWidth: 120 }}>
//           <InputLabel id="">Mood</InputLabel>
//           <Select
//             labelId=""
//             id=""
//             name="mood"
//             value={avatar.mood}
//             label="Mood"
//             onChange={updateMood}
//           >
//             <MenuItem value={1}>Happy</MenuItem>
//             <MenuItem value={2}>Sad</MenuItem>
//           </Select>
//           <FormHelperText>Choose your mood</FormHelperText>
//         </FormControl>
//         {avatar.mood === "happy" ? (
//           <FormControl sx={{ m: 1, minWidth: 120 }}>
//             <InputLabel id="">Mouth</InputLabel>
//             <Select
//               labelId=""
//               id=""
//               name="mouth"
//               value={avatar.mouth}
//               label="Mouth"
//               onChange={updateMouth}
//             >
//               <MenuItem value={1}>1</MenuItem>
//               <MenuItem value={2}>2</MenuItem>
//               <MenuItem value={3}>3</MenuItem>
//               <MenuItem value={4}>4</MenuItem>
//               <MenuItem value={5}>5</MenuItem>
//               <MenuItem value={6}>6</MenuItem>
//               <MenuItem value={7}>7</MenuItem>
//               <MenuItem value={8}>8</MenuItem>
//               <MenuItem value={9}>9</MenuItem>
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={11}>11</MenuItem>
//               <MenuItem value={12}>12</MenuItem>
//               <MenuItem value={13}>13</MenuItem>
//             </Select>
//           </FormControl>
//         ) : (
//           <FormControl sx={{ m: 1, minWidth: 120 }}>
//             <InputLabel id="">Mouth</InputLabel>
//             <Select
//               labelId=""
//               id=""
//               name="mouth"
//               value={avatar.mouth}
//               label="Mouth"
//               onChange={updateMouth}
//             >
//               <MenuItem value={1}>1</MenuItem>
//               <MenuItem value={2}>2</MenuItem>
//               <MenuItem value={3}>3</MenuItem>
//               <MenuItem value={4}>4</MenuItem>
//               <MenuItem value={5}>5</MenuItem>
//               <MenuItem value={6}>6</MenuItem>
//               <MenuItem value={7}>7</MenuItem>
//               <MenuItem value={8}>8</MenuItem>
//               <MenuItem value={9}>9</MenuItem>
//               <MenuItem value={10}>10</MenuItem>
//             </Select>
//           </FormControl>
//         )}
//         {/* <ChromePicker
//           color={mouthColor}
//           //   name="mouthColor"
//           onChange={updateMouthColor(mouthColor)}
//         /> */}
//         <FormControl sx={{ m: 1, minWidth: 120 }}>
//           <InputLabel id="">Glasses</InputLabel>
//           <Select
//             labelId=""
//             id=""
//             name="glasses"
//             value={avatar.glasses}
//             label="Glasses"
//             onChange={updateGlasses}
//           >
//             <MenuItem value={1}>1</MenuItem>
//             <MenuItem value={2}>2</MenuItem>
//             <MenuItem value={3}>3</MenuItem>
//             <MenuItem value={4}>4</MenuItem>
//             <MenuItem value={5}>5</MenuItem>
//             <MenuItem value={6}>6</MenuItem>
//             <MenuItem value={7}>7</MenuItem>
//           </Select>
//           <FormHelperText>Choose your glasses</FormHelperText>
//         </FormControl>
//         {/* <ChromePicker
//           color={glassesColor}
//           //   name="glassesColor"
//           onChange={updateGlassesColor(glassesColor)}
//         /> */}
//       </Box>
//       <Button variant="contained" onClick={handleCreateAvatar}>
//         Create Avatar
//       </Button>
//     </div>
//   );
// };

// export default AddAvatar;
