import LeancloudAlchemy from './dist/index';

LeancloudAlchemy.initAV(
    'app-id',
    'app-key'
);


// awaitable
async function createFeedback(){
    await LeancloudAlchemy.createRow('Feedback', {
        key: 'feedback-key',
        state: 'feedback-state',
        comment: 'feedback-comment'
    });
}