import React from 'react';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { BrowserRouter } from 'react-router-dom';
import ResizeObserver from 'use-resize-observer';
import fetch from 'whatwg-fetch';
import Banner from '../client/components/dashboard/Banner.tsx';
import Navbar from '../client/components/dashboard/Navbar.tsx';
import Cluster from '../client/Pages/Grafana/Cluster.tsx';
import Alerts from '../client/Pages/Alerts.tsx';
import PromQuery from '../client/Pages/PromQuery.tsx';
import CustomAlerts from '../client/Pages/CustomAlerts.tsx';
import Dashboard from '../client/components/dashboard/Dashboard.tsx';
import Overview from '../client/Pages/Overview.tsx';
import App from '../client/App.tsx';
// import fetch from 'node-fetch';

// test state of banner to make sure title is rendered
// test props of navbar after rendering dashboard to make sure apiKey is passed down
// test to make sure title is changing when selecting navbar elements
// test to make sure that clicking on menu items causes a new component to be rendered
// maybe check to see if backend calls have been made after clicking setup buttons
// test visualizer to make sure it is rendering a react-graph-vis graph

test('loads and displays banner', async () => {
  render(<Banner title="Testing banner" />);

  await screen.findByRole('heading');

  // ASSERT
  expect(screen.getByRole('heading')).toHaveTextContent('Testing banner');
});

test('Initial page loads with heading and buttons', async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  await screen.findByRole('heading');

  expect(screen.getByRole('heading')).toHaveTextContent('Fancy Buttons');

  expect(screen.getByText('Setup Prometheus')).toBeInTheDocument();
  expect(screen.getByText('Setup Grafana')).toBeInTheDocument();
  expect(screen.getByText('Start Port Forwarding')).toBeInTheDocument();
  expect(screen.getByText('Go to dashboard')).toBeInTheDocument();
});

// test('user is redirected to dashboard when Go-to-dashboard is clicked', async () => {
//   await render(
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>,
//   );

//   // fireEvent.click(screen.getByText('Go to dashboard'));
//   expect(screen.getByText('Go to dashboard')).toHaveAttribute('href', '/Dashboard');

//   await fireEvent.click(screen.getByText('Go to dashboard'));
//   expect(window.location.pathname).toBe('/Dashboard');
// });

test('renders alerts iframe with correct src', async () => {
  await render(<Alerts />);
  expect(screen.getByTitle('alert embed')).toHaveAttribute('src', 'http://localhost:9093');
});

test('renders prometheus iframe with correct src', async () => {
  await render(<PromQuery />);
  expect(screen.getByTitle('prom query embed')).toHaveAttribute('src', 'http://localhost:9090/graph?&hideGraph=1');
});

test('CustomAlerts renders initial radio buttons', () => {
  render(<CustomAlerts />);
  const memoryRadio = screen.getByLabelText(/memory usage/i);
  const cpuRadio = screen.getByLabelText(/cpu usage/i);
  const kubeRadio = screen.getByLabelText(/kube node down/i);
  expect(memoryRadio).toBeInTheDocument();
  expect(cpuRadio).toBeInTheDocument();
  expect(kubeRadio).toBeInTheDocument();
});

test('shows memory threshold form after selecting Memory radio button', () => {
  render(<CustomAlerts />);
  const memoryRadio = screen.getByLabelText(/memory usage/i);

  fireEvent.click(memoryRadio);
  fireEvent.click(screen.getByText('Next'));
  const memoryThresholdLabel = screen.getByLabelText(/alert after memory usage exceeds/i);
  const memoryThresholdInput = screen.getByRole('spinbutton');
  expect(memoryThresholdLabel).toBeInTheDocument();
  expect(memoryThresholdInput).toBeInTheDocument();
});

test('Grafana page renders iframe with correct src', async () => {
  const apiKey = '123456789';
  const uid = 'abcdefg';
  jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce(uid),
  });
  render(<Cluster apiKey={apiKey} />);
  await waitFor(() => expect(screen.getByTitle('embed cluster')).toHaveAttribute(
    'src',
    expect.stringContaining(
      `http://localhost:3001/d/${uid}/kubernetes-api-server?orgId=1&refresh=10s&from`,
    ),
  ));
});

jest.mock('../client/components/visualizer/Visualizer', () => function MockedTestVis() {
  return <div data-testid="mocked-test-vis" />;
});

test('Overview renders TestVis component inside a div with id visualizer', async () => {
  render(<Overview />);
  const visualizerDiv = screen.getByTestId('visualizer');
  expect(visualizerDiv).toContainElement(screen.getByTestId('mocked-test-vis'));
});
class ResizeObserver {
  observe() {}
  unobserve() {}
}
test('Navbar clicking a sub-menu expands and collapses it', async () => {
  window.ResizeObserver = ResizeObserver;
  const { getByText, queryByText } = render(<BrowserRouter>
    <ProSidebarProvider><Navbar apiKey="123456789" /></ProSidebarProvider>
    {' '}
  </BrowserRouter>);
  expect(queryByText('Use Method(Cluster)')).not.toBeVisible();
  fireEvent.click(getByText('Metrics'));
  expect(queryByText('Use Method(Cluster)')).toBeVisible();
  fireEvent.click(getByText('Metrics'));
  await waitFor(()=>expect(queryByText('Use Method(Cluster)')).not.toBeVisible());
});

test('collapses the sidebar when toggle button is clicked', async () => {
  window.ResizeObserver = ResizeObserver;
  const { getByTestId } = render(<BrowserRouter>
    <ProSidebarProvider><Navbar apiKey="123456789" /></ProSidebarProvider>
    {' '}
  </BrowserRouter>);

expect(getByTestId('ps-sidebar-root-test-id')).not.toHaveClass('ps-collapsed');

  fireEvent.click(getByTestId('pro-sidebar'));
  expect(getByTestId('ps-sidebar-root-test-id')).toHaveClass('ps-collapsed');
  fireEvent.click(getByTestId('pro-sidebar'));
  expect(getByTestId('ps-sidebar-root-test-id')).not.toHaveClass('ps-collapsed');
});



// testing dashboard component renders correctly
// describe('Dashboard component', () => {
//   it('renders Navbar with apiKey prop', async () => {
//     const apiKey = 'testApiKey';

//     // Create a mock global object with the fetch property
//     const mockGlobal = {
//       fetch: jest.fn().mockResolvedValue({
//         json: jest.fn().mockResolvedValue(apiKey),
//       }),
//     };

//     // Replace the global object with the mock object
//     const originalGlobal = global;
//     global = mockGlobal;

//     render(<Dashboard />);

//     // Wait for the fetch request to complete and update the state
//     const navbar = await screen.findByTestId('navbar');
//     expect(navbar).toHaveAttribute('apiKey', apiKey);

//     // Clean up the mock fetch request
//     global = originalGlobal;
//   });
// });

// test('navbar is present when Dashboard is rendered', async () => {
//   render(<Dashboard />);

//   const navBarElement = await screen.findByTestId('navbar');

//   // ASSERT
//   expect(navBarElement).toBeInTheDocument();
// });
