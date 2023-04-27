import {Container, ContainerTitle} from '../../view/style';
import ItemList from './ItemList';
import {ContainerList} from './style';

export default function TrainingList({navigation}) {
  const trainingList = [
    {
      idTraining: 0,
      activitiesQty: 7,
      title: 'TREINO A',
      type: 0,
    },
    {
      idTraining: 1,
      activitiesQty: 7,
      title: 'TREINO B',
      type: 1,
    },
    {
      idTraining: 2,
      activitiesQty: 7,
      title: 'TREINO C',
      type: 2,
    },
    {
      idTraining: 3,
      activitiesQty: 7,
      title: 'TREINO D',
      type: 3,
    },
  ];

  return (
    <Container>
      <ContainerTitle>MEUS TREINOS</ContainerTitle>
      {trainingList.length > 0 ? (
        <ContainerList>
          {trainingList.map((training, index) => (
            <ItemList item={training} navigation={navigation} key={index} />
          ))}
        </ContainerList>
      ) : null}
    </Container>
  );
}
