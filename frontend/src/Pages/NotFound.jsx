
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import * as styles from './NotFound.css.ts';

function NotFound() {
  return (
    <Container className={styles.notFoundContainer}>
      <Row>
        <h1 className={styles.notFoundTitle}>404</h1>
      </Row>
      <Row>
        <h6 className={styles.notFoundSubtitle}>
          <span className={styles.notFoundTitle}>Oops!</span> Page not found
        </h6>
      </Row>
      <Row>
        <p className={styles.notFoundDescription}>You are on the wrong page.</p>
      </Row>
      <Row>
        <Link to="/">
          <Button variant="primary" className={styles.backButton}>
            Back to Home
          </Button>
        </Link>
      </Row>
    </Container>
  );
}

export default NotFound;




