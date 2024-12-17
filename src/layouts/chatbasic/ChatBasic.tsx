import HomeBasic from "../../pages/home/homebasic/HomeBasic";

interface InfoItem {
  text: string;
  query: string;
}

export interface ChatBasicProps {
  HOME_BASIC_TITLE: string;
  HOME_BASIC_DESCRIPTION: string;
  CARDS: InfoItem[];
  LOGO: string;
}

const ChatBasic = ({ props }: { props: ChatBasicProps }) => {
  return <HomeBasic config={props} />;
};

export default ChatBasic;
