import { Courseinfo } from '../types';

const Total = (props: Courseinfo | undefined) => {
  if (props && props.parts !== undefined) {
    const exercises: number = props.parts.reduce(
      (carry, part) => carry + part.exerciseCount,
      0
    );
    return <div>Number of exercises {exercises}</div>;
  }
  throw new Error('Undefined fields found');
};

export default Total;
