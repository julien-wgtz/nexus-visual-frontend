import React from "react";

interface PageProps {
  // Ajoutez ici les propriétés spécifiques à votre page
}

const Page: React.FC<PageProps> = () => {
  return (
    <div>
      <h1>Ma page classique</h1>
      <p>Bienvenue sur ma page!</p>
    </div>
  );
};

export default Page;
