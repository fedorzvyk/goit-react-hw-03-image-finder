export const Button = ({ onLoadMore, children }) => {
  return (
    <button className="Button" onClick={onLoadMore}>
      {children}
    </button>
  );
};
