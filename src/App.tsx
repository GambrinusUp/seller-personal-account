import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import {
    AppShell,
    Burger,
    Group,
    MantineProvider,
    UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

import classes from './App.module.scss';
import AdvertisementPage from './pages/AdvertisementPage/AdvertisementPage';
import AdvertisementsPage from './pages/AdvertisementsPage/AdvertisementsPage';
import OrdersPage from './pages/OrdersPage/OrdersPage';

function App() {
    const [opened, { toggle }] = useDisclosure();

    return (
        <Router>
            <MantineProvider>
                <Notifications />
                <AppShell
                    header={{ height: 60 }}
                    navbar={{
                        width: 300,
                        breakpoint: 'sm',
                        collapsed: { desktop: true, mobile: !opened },
                    }}
                    padding="md"
                >
                    <AppShell.Header>
                        <Group h="100%" px="md">
                            <Burger
                                opened={opened}
                                onClick={toggle}
                                hiddenFrom="sm"
                                size="sm"
                            />
                            <Group justify="space-between" style={{ flex: 1 }}>
                                <Link to="/" className={classes.link}>
                                    Личный кабинет
                                </Link>
                                <Group ml="xl" gap={0} visibleFrom="sm">
                                    <UnstyledButton className={classes.control}>
                                        <Link to="/" className={classes.link}>
                                            Объявления
                                        </Link>
                                    </UnstyledButton>
                                    <UnstyledButton className={classes.control}>
                                        <Link
                                            to="/orders"
                                            className={classes.link}
                                        >
                                            Заказы
                                        </Link>
                                    </UnstyledButton>
                                </Group>
                            </Group>
                        </Group>
                    </AppShell.Header>
                    <AppShell.Navbar py="md" px={2}>
                        <UnstyledButton className={classes.control}>
                            <Link to="/" className={classes.link}>
                                Объявления
                            </Link>
                        </UnstyledButton>
                        <UnstyledButton className={classes.control}>
                            <Link to="/orders" className={classes.link}>
                                Заказы
                            </Link>
                        </UnstyledButton>
                    </AppShell.Navbar>
                    <AppShell.Main>
                        <Routes>
                            <Route path="/" element={<AdvertisementsPage />} />
                            <Route
                                path="/advertisement/:id"
                                element={<AdvertisementPage />}
                            />
                            <Route path="/orders" element={<OrdersPage />} />
                        </Routes>
                    </AppShell.Main>
                </AppShell>
            </MantineProvider>
        </Router>
    );
}

export default App;
