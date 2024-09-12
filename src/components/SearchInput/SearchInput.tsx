import { Button, CloseButton, Flex, Input } from '@mantine/core';
import { MdOutlineSearch } from 'react-icons/md';

interface SearchInputProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    onSearch: () => void;
    resetAds: () => void;
}

function SearchInput({
    searchQuery,
    setSearchQuery,
    onSearch,
    resetAds,
}: SearchInputProps) {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSearch();
        }
    };

    const handleClear = () => {
        setSearchQuery('');
        resetAds();
    };

    return (
        <Flex direction="column" align="center" w="100%">
            <Input
                placeholder="Поиск по названию объявления"
                leftSection={<MdOutlineSearch />}
                mb="sm"
                w="80%"
                radius="md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.currentTarget.value)}
                onKeyDown={handleKeyDown}
                rightSectionPointerEvents="all"
                rightSection={
                    <CloseButton
                        aria-label="Clear input"
                        onClick={handleClear}
                        style={{
                            display: searchQuery ? undefined : 'none',
                        }}
                    />
                }
            />
            <Button variant="filled" radius="md" mb="sm" onClick={onSearch}>
                Поиск
            </Button>
        </Flex>
    );
}

export default SearchInput;
