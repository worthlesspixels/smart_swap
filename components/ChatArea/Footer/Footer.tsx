import React from 'react';
import { FC } from 'react';
import { FooterProps } from './Footer.type';
import InputField from '../../common/InputField/InputField';

const Footer: FC<FooterProps> = ({ onSendMessage, friendName }) => {
  const [message, setMessage] = React.useState('');
  return (
    <div
      className="bottom-0 w-full p-5"
      onKeyDown={(event) => {
        if (event.key === 'Enter' && message !== '') {
          onSendMessage(message);
          setMessage('');
        }
      }}>
      <InputField
        className="w-full rounded-lg bg-[#40444B] "
        showIcon={false}
        placeHolder={`Message @${friendName}`}
        value={message}
        setInpValue={(value: string | number) => {
          if (typeof value === 'number') {
            setMessage(value.toString());
          } else {
            setMessage(value);
          }
        }}
      />
    </div>
  );
};

export default Footer;
