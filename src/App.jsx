const base = import.meta.env.BASE_URL.replace(/\/$/, "");
import "./App.css";
import { useState } from "react";

// Import local images from assets folder
import pic1 from "./assets/pic1.jpg";
import pic2 from "./assets/pic2.jpg";
import pic3 from "./assets/pic3.jpg";
import pic4 from "./assets/pic4.jpg";
import pic5 from "./assets/pic5.jpg";
import pic6 from "./assets/pic6.jpg";
import pic7 from "./assets/pic7.jpg";
import pic8 from "./assets/pic8.jpg";
import pic9 from "./assets/pic9.jpg";
import pic10 from "./assets/pic10.jpg";
import pic11 from "./assets/pic11.jpg";
import pic12 from "./assets/pic12.jpg";
import pic13 from "./assets/pic13.jpg";
import pic14 from "./assets/pic14.jpg";
import pic15 from "./assets/pic15.jpg";
// background image
import back1 from "./assets/back1.png";

//defining different categories, 5 folders for 15 pictures
const categories = ["Night", "Interior", "Exterior", "Streets", "Nature"];

//defining images and their categories, and their URLs
const initialImages = [
  { id: 11, url: pic11, category: "Night" },
  { id: 12, url: pic12, category: "Night" },
  { id: 13, url: pic13, category: "Night" },
  { id: 4, url: pic4, category: "Interior" },
  { id: 5, url: pic5, category: "Interior" },
  { id: 14, url: pic14, category: "Exterior" },
  { id: 7, url: pic7, category: "Interior" },
  { id: 8, url: pic8, category: "Interior" },
  { id: 15, url: pic15, category: "Streets" },
  { id: 3, url: pic3, category: "Streets" },
  { id: 1, url: pic1, category: "Streets" },
  { id: 2, url: pic2, category: "Streets" },
  { id: 9, url: pic9, category: "Nature" },
  { id: 6, url: pic6, category: "Nature" },
  { id: 10, url: pic10, category: "Exterior" },
];

//defining useState,
// setImages updates images
// setDragged and then null shows that there's no action with the image
//then setFeedback means sending feedback and updating it with correct or wrong criteria, changing the colors of the images.
export default function App() {
  const [images, setImages] = useState(initialImages);
  const [dragged, setDragged] = useState(null);
  const [feedback, setFeedback] = useState({});

  // drag images
  const handleDragStart = (img) => setDragged(img);

  //shows and updates the image when is dropped to the folder with existing catergory
  //there is also if statement, if dragged, then check if correct or wrong
  //setDragged(null) - clears the statement for the image state
  const handleDrop = (category) => {
    if (!dragged) return;
    setFeedback({
      ...feedback,
      [dragged.id]: dragged.category === category ? "correct" : "wrong",
    });
    setDragged(null);
  };

  //classname refering to CSS and layout directly
  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${back1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        backgroundAttachment: "fixed", // keeps background stable
      }}
    >
      <h1>Let's divide images to categories!</h1>
      <p>Drag each photo into the correct folder.</p>

      <div className="folders">
        {categories.map((cat) => {
          const correctImages = images.filter(
            (img) => feedback[img.id] === "correct" && img.category === cat
          );
          const totalInCategory = images.filter((img) => img.category === cat)
            .length;
          const folderFull = correctImages.length === totalInCategory;

          return (
            <div
              key={cat}
              className={`folder ${folderFull ? "folder-full" : ""}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(cat)}
            >
              <h3>{cat}</h3>
              <div className="folder-content">
                {correctImages.map((img) => (
                  <div
                    key={img.id}
                    className={`image-wrapper ${
                      feedback[img.id] === "correct"
                        ? "correct"
                        : feedback[img.id] === "wrong"
                        ? "wrong"
                        : ""
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.category}
                      className="thumbnail inside-folder"
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* class that helps to map out images, make them draggable,
      and then also show correct and wrong feedbacks with red and green colors */}
      <div className="images">
        {images
          // keep showing only unplaced images here
          .filter((img) => feedback[img.id] !== "correct")
          .map((img) => (
            <div
              key={img.id}
              draggable
              onDragStart={() => handleDragStart(img)}
              className={`image-wrapper ${
                feedback[img.id] === "correct"
                  ? "correct"
                  : feedback[img.id] === "wrong"
                  ? "wrong"
                  : ""
              }`}
            >
              <img src={img.url} alt={img.category} className="thumbnail" />
            </div>
          ))}

        {/* Placeholder to reserve space so the grid never shrinks */}
        <div className="placeholder"></div>
      </div>
    </div>
  );
}
