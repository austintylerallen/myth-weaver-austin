import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Layout from './components/Layout/Layout.jsx';
import NoHeaderLayout from './components/Layout/NoHeaderLayout.jsx'
import MythIndex from './components/MythIndex/MythIndex.jsx';
import UserProfile from './components/UserProfile/UserProfile.jsx';
import StoryIndex from './components/StoryIndex/StoryIndex.jsx';
import CreateStory from './components/CreateStory/CreateStory.jsx';
import AboutUs from './components/AboutUs/AboutUs.jsx';
import StoryPath from './components/StoryPath/StoryPath.jsx';
import StoryReview from './components/StoryReview/StoryReview.jsx';
import Landing from './components/LandingPage/landing.jsx';
import ErrorComponent from './components/Error/ErrorComponent.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorComponent />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: 'myth-index',
            element: <MythIndex />
          },
          {
            path: 'user-profile',
            element: <UserProfile />
          },
          {
            path: 'story-index/:storyId',
            element: <StoryIndex />
          },
          {
            path: 'create-story',
            element: <CreateStory />
          },
          {
            path: 'about-us',
            element: <AboutUs />
          },
          {
            path: 'story-path/:storyId',
            element: <StoryPath />
          },
          {
            path: 'story-review/:storyId',
            element: <StoryReview />
          },
        ],
      },
      {
        element: <NoHeaderLayout />,
        children: [
          {
            index: true,
            element: <Landing />
          }
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
