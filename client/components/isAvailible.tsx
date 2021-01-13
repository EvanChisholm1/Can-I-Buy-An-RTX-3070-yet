import { FC } from 'react';

interface isAvailibleProps {
  isAvailible: boolean;
  name: string;
}

export const IsAvailible: FC<isAvailibleProps> = ({ isAvailible, name }) => {
  return (
    <div>
      <h1 className="text-center text-3xl m-5">Can I buy a {name} yet?</h1>
      <div
        className={`${
          isAvailible ? 'bg-green-500' : 'bg-red-500'
        } text-center p-10`}
      >
        {isAvailible ? (
          <h2 className="text-9xl font-bold ">Yes!</h2>
        ) : (
          <h2 className="text-9xl font-bold">No :(</h2>
        )}
      </div>
    </div>
  );
};
