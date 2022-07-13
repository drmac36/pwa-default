import { getAdvanced } from '@magento/pagebuilder/lib/utils';

export default node => {
    return {
        button_title: node.getAttribute('data-button_title'),
        success_message: node.getAttribute('data-success_message'),
        richContent: node.childNodes[0] ? node.childNodes[0].innerHTML : '',
        ...getAdvanced(node)
    };
};
