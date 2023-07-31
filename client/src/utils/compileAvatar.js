// import React, { useMemo } from "react";
// import { createAvatar } from "@dicebear/core";
// import { pixelArtNeutral } from "@dicebear/collection";
// import { create } from "@mui/material/styles/createTransitions";

// const CompileAvatar = ({ avatar }) => {
//   const bgColor = avatar.bgColor;
//   const eyes = avatar.eyes;
//   const mouth = avatar.mouth;
//   const mood = avatar.mood;
//   const glasses = avatar.glasses;
//   const mouthColor = avatar.mouthColor;
//   const glassesColor = avatar.glassesColor;

//   const addZero = (num) => {
//     return num < 10 ? `0${num}` : num;
//   };

//   // const avatar = createAvatar(pixelArtNeutral, {
//   //   size: 96,
//   //   backgroundColor: bgColor,
//   //   eyes: `variant${addZero(eyes)}`,
//   //   mouth: `${mood}${addZero(mouth)}`,
//   //   mouthColor: mouthColor,
//   //   glasses: `light${addZero(glasses)}`,
//   //   glassesColor: glassesColor,
//   // });

//   // const svg = avatar.toString();

//   // return svg;
//   // };
//   const buildAvatar = useMemo(() => {
//     return createAvatar(pixelArtNeutral, {
//       size: 96,
//       backgroundColor: bgColor.color,
//       eyes: `variant${addZero({ eyes })}`,
//       mouth: `${mood}${addZero({ mouth })}`,
//       mouthColor: mouthColor.color,
//       glasses: `light${addZero({ glasses })}`,
//       glassesColor: glassesColor.color,
//     }).toDataUriSync();
//   }, []);

//   console.log(buildAvatar);

//   return (
//     <div>
//       <img src={buildAvatar} alt="avatar" />
//     </div>
//   );
// };

// export default CompileAvatar;
