/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { expect, spy } from 'chai';

import { describeModuleTest } from '#/helpers/util';
import { loggerStub } from '#/mock/MockedLogger';

import { SongPipelineStage } from '@/background/pipeline/SongPipelineStage';
import { SongPipeline } from '@/background/pipeline/SongPipeline';
import { createSongStub } from '#/stub/SongStubFactory';

describeModuleTest(__filename, () => {
	it('should execute all stages', async () => {
		const processor1 = createDummyProcessor();
		const processor2 = createDummyProcessor();

		const spyMethod1 = spy.on(processor1, 'process');
		const spyMethod2 = spy.on(processor2, 'process');

		const pipeline = new SongPipeline([processor1, processor2], loggerStub);
		await pipeline.process(createSongStub());

		expect(spyMethod1).to.have.called.exactly(1);
		expect(spyMethod2).to.have.called.exactly(1);
	});
});

function createDummyProcessor(): SongPipelineStage {
	return new (class implements SongPipelineStage {
		process(): Promise<void> {
			return Promise.resolve();
		}
	})();
}