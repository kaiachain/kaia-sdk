import os

def rename_files(root_dir, pattern):
    """
    Rename all files in each directory under the root directory based on the provided pattern.

    :param root_dir: The root directory to start renaming files
    :param pattern: A function that takes the original filename and returns the new filename
    """
    for dirpath, dirnames, filenames in os.walk(root_dir):
        for filename in filenames:
            old_path = os.path.join(dirpath, filename)
            new_filename = pattern(filename)
            new_path = os.path.join(dirpath, new_filename)
            os.rename(old_path, new_path)
            print(f'Renamed: {old_path} -> {new_path}')

def example_pattern(filename):
    """
    Example pattern function that adds a prefix 'new_' to each filename.

    :param filename: The original filename
    :return: The new filename
    """
    return f'Kaia{filename[4:]}'

# Usage example:
root_directory = '/Users/krust/web3py-test/web3klaytn/web3rpc/rpc-specs/code-samples/java/src/main/java/opensdk/sdk/apis/kaia'
rename_files(root_directory, example_pattern)
