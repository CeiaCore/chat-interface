interface ICustomConfig {
  //application
  application_name: string;
  logo_image: any;
  web_title: string;
  favicon: any;

  //chat
  reference_source: boolean;

  //input
  reasoning: boolean;
  input_file: boolean;
  web_search: boolean;

  //templates
  home: string;
  login: string;
}

// Example Usage
export const CustomConfig: ICustomConfig = {
  web_title: "Teste - Chatbot",
  favicon: null,
  application_name: "teste",
  logo_image: null,
  reference_source: true,
  reasoning: true,
  input_file: true,
  web_search: true,
  home: "HomeB",
  login: "LoginA",
};
