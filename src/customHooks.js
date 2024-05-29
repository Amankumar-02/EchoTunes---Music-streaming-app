export const shuffleArray = (array) => {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [
            shuffledArray[j],
            shuffledArray[i],
        ];
    }
    return shuffledArray;
};

export const fetchData = async (url) => {
    try {
        const data = await fetch(url);
        const response = await data.json();
        const shuffledSongs = shuffleArray(response);
        return shuffledSongs
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};




// Fetch data from local
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await fetch("http://localhost:5173/songs/songs.html");
//         const response = await data.text();
//         let div = document.createElement("div");
//         div.innerHTML = response;
//         let as = div.getElementsByTagName("a");
//         let images = div.getElementsByTagName("img");
//         let fetchedSongs = [];
//         for (let i = 0; i < as.length; i++) {
//           const anchor = as[i];
//           const source = images[i];
//           if (anchor.href.endsWith(".mp3") && source.src) {
//             let song = {
//               media: anchor.href,
//               img: source.src,
//               title: anchor.innerHTML.split(" - ")[0],
//               desc: anchor.innerHTML.split(" - ")[1],
//             };
//             fetchedSongs.push(song);
//           }
//         }
//         const shuffledSongs = shuffleArray(fetchedSongs);
//         setSongs(shuffledSongs);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);