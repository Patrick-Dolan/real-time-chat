interface AvatarProps {
  rounded?: boolean;
  size: "sm" | "md";
  avatarURL?: string;
}

function Avatar({ rounded, size, avatarURL }: AvatarProps) {
  let sizeStyles: string = "";

  switch (size) {
    case "sm":
      sizeStyles = "h-10 w-10";
      break;
    case "md":
      sizeStyles = "h-32 w-32";
      break;
    default:
      sizeStyles = "h-10 w-10";
  }
  return (
    <div
      className={`flex justify-center items-center bg-black ${
        rounded ? "rounded-full" : ""
      } ${sizeStyles}`}
    >
      <img
        src={avatarURL || "/assets/icons/AvatarIcon.svg"}
        alt="Avatar"
        className={
          avatarURL
            ? "h-full w-full object-cover rounded-full"
            : "h-2/3 object-cover"
        }
      />
    </div>
  );
}

export default Avatar;
