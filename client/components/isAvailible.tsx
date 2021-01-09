import { FC } from 'react';

interface isAvailibleProps {
  isAvailible: boolean;
  name: string;
}

export const IsAvailible: FC<isAvailibleProps> = ({ isAvailible, name }) => {
  return (
    <div>
      <h3>is {name} availible yet?</h3>
      <div
        className={`${
          isAvailible ? 'bg-green-500' : 'bg-red-500'
        } text-center p-10`}
      >
        {isAvailible ? (
          <h2 className="text-9xl font-bold ">Yes!</h2>
        ) : (
          <h2 className="text-9xl">No :(</h2>
        )}
      </div>
    </div>
  );
};
