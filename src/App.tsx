import Content from './components/Content/Content'
import Header from './components/Header/Header'
import SignupForm from './pages/auth/SingupForm'

export default function App() {
  return (
    <>
      <Header />
      <Content>
       <SignupForm />
      </Content>
    </>
  );
}