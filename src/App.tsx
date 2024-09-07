import '@mantine/core/styles.css';

import {
    AppShell,
    Burger,
    Group,
    MantineProvider,
    UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import classes from './App.module.scss';
import AdvertisementsPage from './pages/Advertisements';

function App() {
    const [opened, { toggle }] = useDisclosure();

    return (
        <Router>
            <MantineProvider>
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
                                Личный кабинет
                                <Group ml="xl" gap={0} visibleFrom="sm">
                                    <UnstyledButton className={classes.control}>
                                        Объявления
                                    </UnstyledButton>
                                    <UnstyledButton className={classes.control}>
                                        Заказы
                                    </UnstyledButton>
                                </Group>
                            </Group>
                        </Group>
                    </AppShell.Header>

                    <AppShell.Navbar py="md" px={2}>
                        <UnstyledButton className={classes.control}>
                            Объявления
                        </UnstyledButton>
                        <UnstyledButton className={classes.control}>
                            Заказы
                        </UnstyledButton>
                    </AppShell.Navbar>

                    <AppShell.Main>
                        <Routes>
                            <Route path="/" element={<AdvertisementsPage />} />
                        </Routes>
                    </AppShell.Main>
                </AppShell>
            </MantineProvider>
        </Router>
    );
}

export default App;
