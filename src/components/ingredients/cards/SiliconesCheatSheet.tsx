import { CheatSheet } from '../CheatSheet';

const SiliconesCheatSheet: React.FC = () => {
  return (
    <CheatSheet
      title="Silicones"
      description="These are generally avoided in the curly hair community due to potential build-up. They may require strong detergents to remove."
      sources={[
        {
          source: "Curlsbot",
          status: "caution",
          link: "https://www.curlsbot.com",
          description: "Avoid silicones"
        },
        {
          source: "Curly Girl Handbook",
          status: "warning",
          description: "Avoid silicones"
        },
        {
          source: "Sciencey Hair Blog",
          status: "ok",
          link: "https://science-yhairblog.blogspot.com",
          description: "Silicones are generally OK for most people"
        }
      ]}
      identificationSections={[
        {
          title: "Names ending with 'cone'",
          ingredients: ['Amodimethicone', 'Dimethicone']
        },
        {
          title: "Names starting with 'sil'",
          ingredients: ['Siloxane', 'Siloxysilicate', 'Silsesquioxane', 'Silylate']
        },
        {
          title: "Specific ingredients",
          ingredients: ['Botanisil', 'Microsil']
        }
      ]}
    />
  );
};

export default SiliconesCheatSheet;
