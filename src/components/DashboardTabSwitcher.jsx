import { createContext, useContext, useState } from 'react';

const TabContext = createContext({});

function DashboardTabSwitcher(props) {
  const [activeTabID, setActiveTabID] = useState('Projelerim');
  return <TabContext.Provider value={[activeTabID, setActiveTabID]}>{props.children}</TabContext.Provider>;
}

function DashboardTabPanel({ whenActive, children }) {
  const [activeTabID] = useContext(TabContext);
  return <>{activeTabID == whenActive ? children : null}</>;
}

function DashboardTab({ id, children }) {
  const [, setActiveTabID] = useContext(TabContext);
  return (
    <>
      <div onClick={() => setActiveTabID(id)}>{children}</div>
    </>
  );
}

export default DashboardTabSwitcher;

export { DashboardTabPanel, DashboardTab };
