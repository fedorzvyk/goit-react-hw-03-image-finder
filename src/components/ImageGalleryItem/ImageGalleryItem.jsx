export const ImageGalleryItem = ({
  tags,
  webformatURL,
  largeImageURL,
  onClickImage,
}) => {
  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        onClick={() => onClickImage(largeImageURL, tags)}
        src={webformatURL}
        alt=""
      />
    </li>
  );
};
