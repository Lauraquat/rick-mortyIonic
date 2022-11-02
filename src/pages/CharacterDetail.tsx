import { IonBackButton, IonButton, IonContent, IonHeader, IonImg, IonPage, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import { type } from 'os';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './CharacterDetail.css';

type Location = {
  id: number;
  name: string;
}

type Character = {
  id: number;
  name: string;
  image: string;
  status: string;
  location: Location;
}

type Params = {
  id: string;
}

const CharacterDetail: React.FC = () => {
  const [character, setCharacters] = useState<Character>();
  const characterInfo = useParams<Params>();

  useEffect(() => {
    console.log(characterInfo);
    fetch(`https://rickandmortyapi.com/api/character/${characterInfo.id}`)
      .then((res) => res.json())
      .then(
        (apiResult) => {
          setCharacters(apiResult);
        },
        (error) => { }
      );
  }, []);

  let content;

  if (character !== undefined) {

    content = (
      <div>
        <IonImg src={character.image}></IonImg>
        <h1>{character.name}</h1>
        <ul>
          <li>{character.location.name}</li>
          <li>{character.status}</li>
        </ul>
      </div>
    )
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Personnage</IonTitle>
          <IonButton slot="start"><IonBackButton defaultHref="home"/></IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {content}
      </IonContent>
    </IonPage>
  );
};

export default CharacterDetail;