import React from 'react';
import { Link } from 'react-router-dom';

type bannerProps = {
  title: string,
}

function Banner(props: bannerProps) {
  const { title } = props;
  return (
    <div id="Banner">
      <h2>{title}</h2>
    </div>
  );
}

export default Banner;
