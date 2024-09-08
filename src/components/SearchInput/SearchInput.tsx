import { Button, CloseButton, Flex, Input } from '@mantine/core';
import { MdOutlineSearch } from 'react-icons/md';

interface SearchInputProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    onSearch: () => void;
}

function SearchInput({
    searchQuery,
    setSearchQuery,
    onSearch,
}: SearchInputProps) {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSearch();
        }
    };

    return (
        <Flex direction="column" align="center" style={{ width: '100%' }}>
            <Input
                placeholder="Поиск по названию объявления"
                leftSection={<MdOutlineSearch />}
                mb="sm"
                style={{ width: '80%' }}
                radius="md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.currentTarget.value)}
                onKeyDown={handleKeyDown}
                rightSectionPointerEvents="all"
                rightSection={
                    <CloseButton
                        aria-label="Clear input"
                        onClick={() => setSearchQuery('')}
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
