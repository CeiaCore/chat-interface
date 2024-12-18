import HomeCard from "../../pages/home/homecard/HomeCard";

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

const ChatAdvanced = ({ props }: { props: ChatBasicProps }) => {
  return <HomeCard config={props} />;
};

export default ChatAdvanced;
