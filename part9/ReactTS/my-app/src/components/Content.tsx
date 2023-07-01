import { Courseinfo, CoursePart } from '../types';

const Content = (props: Courseinfo | undefined) => {
  if (props && props.parts instanceof Array && props.parts !== undefined) {
    const list = props.parts.map((v: CoursePart) => {
      switch (v.kind) {
        case 'basic':
          return (
            <li key={v.name}>
              <b>
                {v.name} {v.exerciseCount}
              </b>
              <p>
                <i>{v.description}</i>
              </p>
            </li>
          );
        case 'group':
          return (
            <li key={v.name}>
              <b>
                {v.name} {v.exerciseCount}
              </b>
              <p>project exercises {v.groupProjectCount}</p>
            </li>
          );
        case 'background':
          return (
            <li key={v.name}>
              <b>
                {v.name} {v.exerciseCount}
              </b>
              <p>
                <i>{v.description}</i>
              </p>
              <p>submit to {v.backgroundMaterial}</p>
            </li>
          );
        case 'special':
          return (
            <p key={v.name}>
              <b>
                {v.name} {v.exerciseCount}
              </b>
              <p>
                <i>{v.description}</i>
              </p>
              <p>required skills: {v.requirements.join(', ')}</p>
            </p>
          );
      }
    });
    return (
      <div>
        <ul style={{ listStyleType: 'none' }}>{list}</ul>
      </div>
    );
  }
  throw new Error('Undefined fields found');
};

export default Content;
