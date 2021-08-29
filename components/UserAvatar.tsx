import { Avatar, AvatarProps } from "@chakra-ui/avatar";
import { User } from "types/projects";

interface UserAvatarProps extends AvatarProps {
  user: User;
}

function UserAvatar(props: UserAvatarProps) {
  return (
    <Avatar
      showBorder={true}
      border="0.1px solid black"
      bg="white"
      size={props.size}
      name={props.user.firstName}
      src={
        props.user.avatar?.url ??
        `https://avatars.dicebear.com/api/jdenticon/${props.user.username}.svg`
      }
    />
  );
}

export default UserAvatar;
