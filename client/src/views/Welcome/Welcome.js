import React, { useRef, useEffect } from 'react';
import styles from './Welcome.module.scss';
import { Link } from 'react-router-dom';
import Circle from '../../components/layout/Circle/Circle';
import Heading from '../../components/layout/Heading/Heading';
import Button from '../../components/shared/Button/Button';
import gsap from 'gsap';

const WelcomeView = () => {
  const wrapper = useRef(null);

  useEffect(() => {
    const elements = wrapper.current.children;
    const buttons = elements[1];
    const headingPrimary = elements[2].children[0];
    const headingSecondary = elements[2].children[1];
    const icons = elements[3];

    gsap.set([buttons, headingPrimary, headingSecondary, icons], { autoAlpha: 0 });
    gsap.set(icons, {transformOrigin: '50% 100%'});

    const tl = gsap.timeline({defaults: { ease: 'power3.inOut'}});

    tl.fromTo(headingPrimary, {x: '-=50'}, {duration: 1.3, x: '+=50', autoAlpha: 1})
      .fromTo(headingSecondary, {x: '+=50'}, {duration: 1.3, x: '-=50', autoAlpha: 1}, '-=1.3')
      .fromTo(icons, {scaleY: 0}, {duration: .5, scaleY: 1, autoAlpha: 1})
      .fromTo(buttons, {y: '-=20'}, {duration: .5, y: '+=20', autoAlpha: 1}, '-=.5')
  })

  return (
  <div ref={wrapper} className={styles.wrapper}>
    <Circle />
    <div id="buttons" className={styles.btnWrapper}>
      <Link to='/login'>
        <Button text='Log in' />
      </Link>
      <Link to='/registration'>
        <Button text='Register' secondary />
      </Link>
    </div>
    <div id="headings" className={styles.headingWrapper}>
      <Heading text='Finance world' />
      <Heading text='Manage your wallet balance, staying at home' secondary />
    </div>
    <div id="icons" className={styles.iconsWrapper}>
      <div className={styles.iconWrapper}>
        <i className="fa fa-globe-europe"></i>
        <p className={styles.iconDescription}>World finance</p>
      </div>
      <div className={styles.iconWrapper}>
        <i className="fas fa-coins"></i>
        <p className={styles.iconDescription}>Credits</p>
      </div>
      <div className={styles.iconWrapper}>
        <i className="fas fa-poll"></i>
        <p className={styles.iconDescription}>Easy control</p>
      </div>
    </div>
  </div>
)};

export default WelcomeView;
